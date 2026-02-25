export type SessionInput = {
  content: string;
  wordCount: number;
  wordGoal: number;
};

export type SessionRecord = SessionInput & {
  id: string;
  createdAt: string;
  updatedAt: string;
};
