export type Quiz = {
  category: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export type QuizResponse = {
  results: Quiz[];
}
