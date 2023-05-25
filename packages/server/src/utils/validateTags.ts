export const validateTag = (value: any) => {
  const allowedTags = [
    "Creative",
    "Lifestyle",
    "Motivation",
    "Responsive",
    "Inspiration",
  ];

  // Split the tags string into an array
  const tags: string[] = value.split(",");

  // Check if each tag is in the allowedTags array
  const isValid = tags.every((tag) => allowedTags.includes(tag));

  // If at least one tag is not valid, throw an error
  if (!isValid) {
    throw new Error("Invalid tag(s)");
  }

  // Return true if all tags are valid
  return true;
};
