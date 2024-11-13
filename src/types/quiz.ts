export interface IQuiz {
  id: number;
  question: string;
  choice: string[];
}

export interface IQuizResponse {
  data: IQuiz[]; // Change this to an array
  
  message: string;
}

export interface IQuizAnswer {
  quizId: number;
  answer: string;
}
