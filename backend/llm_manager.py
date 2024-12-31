import os
from dotenv import load_dotenv
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig

# Load environment variables from .env file
load_dotenv()

class LLMManager:
    def __init__(self, model_name: str, quant_4_bit: bool = True):
        self.device = self._get_device()
        self.tokenizer = AutoTokenizer.from_pretrained(
            model_name,
            use_auth_token=os.getenv("HF_AUTH_TOKEN")
        )

        # Ensure pad_token_id is set
        if self.tokenizer.pad_token_id is None:
            self.tokenizer.pad_token_id = self.tokenizer.eos_token_id

        quant_config = None
        if self.device != "mps":  # Quantization supported only on CUDA or CPU
            try:
                quant_config = BitsAndBytesConfig(
                    load_in_4bit=quant_4_bit,
                    bnb_4bit_use_double_quant=True,
                    bnb_4bit_compute_dtype=torch.bfloat16,
                    bnb_4bit_quant_type="nf4"
                )
            except Exception as e:
                print(f"Quantization config failed: {e}")
                quant_config = None

        self.model = AutoModelForCausalLM.from_pretrained(
            model_name,
            quantization_config=quant_config,
            use_auth_token=os.getenv("HF_AUTH_TOKEN"),
            device_map="auto" if self.device != "mps" else None,
        )

        print(f"Model loaded successfully on {self.device}!")

    def _get_device(self):
        if torch.backends.mps.is_available():
            return "mps"
        elif torch.cuda.is_available():
            return "cuda"
        else:
            return "cpu"

    def generate_response(
        self, 
        user_input: str, 
        system_prompt: str = "You are a helpful assistant.", 
        max_length: int = 50, 
        temperature: float = 0.7
    ):
        # Combine the system prompt with the user input
        prompt = f"{system_prompt}\n\nUser: {user_input}\nAssistant:"

        # Tokenize the input with padding and attention mask
        inputs = self.tokenizer(
            prompt,
            return_tensors="pt",
            padding=True,
            truncation=True,
            max_length=512,
            return_attention_mask=True,
        ).to(self.device)

        # Generate the model's output
        outputs = self.model.generate(
            inputs["input_ids"],
            attention_mask=inputs["attention_mask"],
            max_length=max_length,
            temperature=temperature,
            top_p=0.9,
            do_sample=True,
            pad_token_id=self.tokenizer.pad_token_id,
        )

        # Decode the model's response
        full_response = self.tokenizer.decode(outputs[0], skip_special_tokens=True)

        # Extract the model's response by removing the input prompt
        if "Assistant:" in full_response:
            response = full_response.split("Assistant:")[-1].strip()
        else:
            response = full_response  # Fallback if no "Assistant:" tag is found

        return response

