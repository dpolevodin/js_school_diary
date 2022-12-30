export const surnameRules = [
    {
      required: true,
      message: "Введите фамилию!",
      whitespace: true,
    },
    {
      pattern: /^[А-ЯЁ][а-яё]*$/,
      message: "Введите фамилию с заглавной буквы",
    },
  ];
  
  export const nameRules = [
    {
      required: true,
      message: "Введите имя!",
      whitespace: true,
    },
    {
      pattern: /^[А-ЯЁ][а-яё]*$/,
      message: "Введите имя с заглавной буквы",
    },
  ];
  
  export const patronymicRules = [
    {
      pattern: /^[А-ЯЁ][а-яё]*$/,
      message: "Введите отчество с заглавной буквы",
    },
  ];
  
  export const passwordRules = [
    {
      required: true,
      message: "Введите пароль!",
    },
    {
      min: 8,
      message: "Пароль должен содержать не менее 8 символов",
    },
    {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s])/,
      message:
        "пароль должен содержать минимум: 1 символ, 1 заглавную букву, 1 цифру",
    },
];
=======
  {
    required: true,
    message: "Введите фамилию!",
    whitespace: true,
  },
  {
    pattern: /^[А-ЯЁ][а-яё]*$/,
    message: "Введите фамилию с заглавной буквы",
  },
];

export const nameRules = [
  {
    required: true,
    message: "Введите имя!",
    whitespace: true,
  },
  {
    pattern: /^[А-ЯЁ][а-яё]*$/,
    message: "Введите имя с заглавной буквы",
  },
];

export const patronymicRules = [
  {
    pattern: /^[А-ЯЁ][а-яё]*$/,
    message: "Введите отчество с заглавной буквы",
  },
];

export const passwordRules = [
  {
    required: true,
    message: "Введите пароль!",
  },
  {
    min: 8,
    message: "Пароль должен содержать не менее 8 символов",
  },
  {
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s])/,
    message:
      "пароль должен содержать минимум: 1 символ, 1 заглавную букву, 1 цифру",
  },
];
