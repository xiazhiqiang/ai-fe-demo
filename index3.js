import {
  pipeline,
  env,
  T5ForConditionalGeneration,
  T5Tokenizer,
  GPT2Model,
  GPT2Tokenizer,
} from "http://127.0.0.1:8080/js/@xenova/transformers/2.17.2/transformers.min.js";

// Disable the loading of remote models from the Hugging Face Hub:
env.allowRemoteModels = false;

// Specify a custom location for models (defaults to '/models/').
env.localModelPath = `//${location.host}/models/`;

// Set location of .wasm files. Defaults to use a CDN.
env.backends.onnx.wasm.wasmPaths = `//${location.host}/js/@xenova/transformers/2.17.2/`;

// Reference the elements that we will need
const status = document.getElementById("status");

// Result element
const result = document.getElementById("result");
document.getElementById("title").text = "gpt demo";

// // Create a new object detection pipeline
// status.textContent = "Loading model...";
// const detector = await pipeline("text2text-generation", "Xenova/t5-small");
// status.textContent = "Ready";
// console.log("detector", detector);

// let model = await T5ForConditionalGeneration.from_pretrained("Xenova/t5-small");
// let tokenizer = await T5Tokenizer.from_pretrained("Xenova/t5-small");
// let { input_ids } = await tokenizer(
//   "Studies have been shown that owning a dog is good for you",
//   {
//     return_tensors: "pt",
//   }
// );
// let outputs = await model.generate(input_ids, {
//   max_length: 1000,
//   num_return_sequences: 1,
//   early_stopping: true,
// });
// let decoded = await tokenizer.decode(outputs[0], { skip_special_tokens: true });
// console.log("ret", decoded);

// console.log("ret", ret);
// result.textContent = JSON.stringify(ret, null, 2);

// ---------------------------------------------
// const generator = await pipeline("text-generation", "Xenova/gpt2");

status.textContent = "Loading model...";
let tokenizer = await GPT2Tokenizer.from_pretrained("Xenova/gpt2");
let model = await GPT2Model.from_pretrained("Xenova/gpt2");
status.textContent = "Ready";

let text = "generate random name: ";
let encoded_input = await tokenizer(text, { return_tensors: "pt" });
let outputs = await model.generate(encoded_input.input_ids, {
  max_length: 10,
});
let decoded = await tokenizer.decode(outputs[0], {
  skip_special_tokens: true,
});
console.log("ret", decoded);
result.textContent = JSON.stringify(decoded, null, 2);
