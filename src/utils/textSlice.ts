export function getDescription(description: string, limite: number = 120) {
  if (description.length > limite) {
    return description.slice(0, limite) + '...';
  }
  return description;
}
