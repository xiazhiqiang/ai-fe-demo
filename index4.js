// 文档：https://qwen.readthedocs.io/zh-cn/latest/inference/chat.html
import * as TransformerJS from "http://127.0.0.1:8080/js/@xenova/transformers/2.17.2/transformers.min.js";
import {
  pipeline,
  env,
  AutoModelForCausalLM,
  AutoTokenizer,
} from "http://127.0.0.1:8080/js/@xenova/transformers/2.17.2/transformers.min.js";

console.log("transformers", TransformerJS);

// Disable the loading of remote models from the Hugging Face Hub:
env.allowRemoteModels = false;

// Specify a custom location for models (defaults to '/models/').
env.localModelPath = `//${location.host}/models/`;

// Set location of .wasm files. Defaults to use a CDN.
env.backends.onnx.wasm.wasmPaths = `//${location.host}/js/@xenova/transformers/2.17.2/`;

// Reference the elements that we will need
const status = document.getElementById("status");
const input = document.getElementById("input");
const submit = document.getElementById("submit");
const result = document.getElementById("result");
input.value = "Give me a short introduction to large language model.";

status.textContent = "Loading model...";

// Create text-generation pipeline
const generator = await pipeline("text-generation", "Xenova/Qwen1.5-0.5B-Chat");
let tokenizer = await AutoTokenizer.from_pretrained("Xenova/Qwen1.5-0.5B-Chat");
let model = await AutoModelForCausalLM.from_pretrained(
  "Xenova/Qwen1.5-0.5B-Chat"
);
status.textContent = "Ready";

submit.onclick = async function () {
  const prompt = input.value;
  const messages = [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: prompt },
  ];

  const text = await tokenizer.apply_chat_template(messages, {
    tokenize: false,
    add_generation_prompt: true,
  });

  // Generate text
  const output = await generator(text, {
    max_new_tokens: 128,
    do_sample: false,
    return_full_text: false,
  });
  console.log(output[0].generated_text);

  // const model_inputs = await tokenizer([text], { return_tensors: "pt" });
  // let generated_ids = await model.generate(model_inputs.input_ids, {
  //   max_new_tokens: 512,
  // });
  // console.log("mo", model_inputs, generated_ids);

  // const generatedTexts = generated_ids[0].map((outputIds, index) => {
  //   console.log("outputIds", outputIds);
  //   return outputIds.substring(model_inputs.input_ids[index].length);
  // });

  // console.log("mo", generated_ids, generatedTexts);
  // // const output = await tokenizer.batch_decode(generated_ids, { skip_special_tokens: true})
  // // console.log('output', output);
};
