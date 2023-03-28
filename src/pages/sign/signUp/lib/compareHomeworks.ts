import { Homeworks } from "./types";

export const compareHomeworks = (
  arr1: Homeworks,
  arr2: Homeworks | undefined
): Homeworks => {
  const result: Homeworks = [];
  if (!arr2) return arr1;

  arr2.forEach((homework2) => {
    const matchingHomework1 = arr1.find(
      (homework1) => homework1.id === homework2.id
    );

    if (matchingHomework1) {
      result.push({
        id: homework2.id,
        title: homework2.title,
        deadline: homework2.deadline,
        status: matchingHomework1.status || homework2.status,
      });
    } else {
      result.push(homework2);
    }
  });

  return result;
};
