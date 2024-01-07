const splitName = (name) => {
  let nameParts = name.split(" ");

  if (nameParts.length > 2) {
    // Combine the last name parts
    let lastName = nameParts.slice(1).join(" ");
    nameParts = [nameParts[0], lastName];
  }

  return nameParts;
};

export default splitName;
