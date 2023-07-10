import * as z from "zod";

export default function parseZodErrors<T>(errors: z.SafeParseReturnType<T, T>, targetName: string) {
  if(errors.success) return '';
  
  const issue = errors.error.issues.find((issue) => issue.path[0] === targetName)?.message
  if (issue) return issue;

  return "";
}