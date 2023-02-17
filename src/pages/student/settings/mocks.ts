export type HomeworkCard = {
  homework: string;
  homeworkStatus: string;
  deadline: string;
};
export const homeworkCards = <HomeworkCard[]>[
  {
    homework: "Дз 1",
    homeworkStatus: "success",
    deadline: "25.03.2023",
  },
  {
    homework: "Дз 2",
    homeworkStatus: "warning",
    deadline: "10.04.2023",
  },
  {
    homework: "Дз 3",
    homeworkStatus: "",
    deadline: "22.04.2023",
  },
  {
    homework: "Дз 4",
    homeworkStatus: "",
    deadline: "15.05.2023",
  },
  {
    homework: "Дз 5",
    homeworkStatus: "",
    deadline: "28.05.2023",
  },
];
