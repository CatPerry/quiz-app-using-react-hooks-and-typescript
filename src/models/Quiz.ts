export type Quiz = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: [
    string
  ];
};

export type QuizResponse = {
  response_code: number;
  results: Quiz[];

}