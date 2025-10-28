const plugin = require("tailwindcss/plugin");

const Myclass = plugin(function ({ addUtilities }) {
  addUtilities({
    ".my-rotate-y-180": {
      transform: "rotateY(180deg)",
    },
    ".preserve-3d": {
      transformStyle: "preserve-3d",
    },
    ".perspective": {
      perspective: "1000px",
    },
    ".backface-hidden": {
      backfaceVisibility: "hidden",
    },
  });
});
module.exports = {
  mode: "jit",
  content: ["./src/*.html"],
  theme: {
    extend: {},
  },
  plugins: [Myclass],
};


function sumar(num1,num2){
let resultado = num1 + num2
return resultado
}

sumar(2+3)