import {
  pipeline,
  env,
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

// Create a new object detection pipeline
status.textContent = "Loading model...";
const detector = await pipeline("Text2Text Generation", "Xenova/t5-small");
status.textContent = "Ready";
console.log("detector", detector);

// const ret = await detector("Hello I'm a [MASK] model.");
// console.log("result", ret);
// result.textContent = JSON.stringify(ret, null, 2);
