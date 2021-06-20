const generateTS = {
  [
  'VariableDeclarator' + ''
  ] (node) {
    if (!node.elements) {
      return [];
    }
    return node.elements.map((element) => {
      return element.value;
    });
  },
};

export default generateTS;
