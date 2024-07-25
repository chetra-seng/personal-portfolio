export function validateInput(
  input: string,
  type: "email" | "text",
  length: number,
) {
  if (!input || input === "") {
    return { result: false, error: "Input can't be empty" };
  }

  if (type === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input)) {
      return { result: false, error: "Invalid email" };
    }
  }
  if (input.length > length) {
    return {
      result: false,
      error: `Input must be at least ${length} characters`,
    };
  }

  return { result: true, data: input };
}
