export interface Iresult {
    status: boolean
    code: number
    payload: Payload
}

export interface Payload {
    submission: Submission
    analytics: Analytic[]
    metadata: Metadata
}

export interface Submission {
    id: string
    userId: string
    examId: string
    examTitle: string
    exam: Exam
    score: number
    totalQuestions: number
    correctAnswers: number
    wrongAnswers: number
    startedAt: string
    submittedAt: string
    createdAt: string
    updatedAt: string
}

export interface Exam {
    id: string
    title: string
    duration: number
}

export interface Analytic {
    questionId: string
    questionText: string
    selectedAnswer: SelectedAnswer
    isCorrect: boolean
    correctAnswer: CorrectAnswer
}

export interface SelectedAnswer {
    id?: string
    text?: string
}

export interface CorrectAnswer {
    id?: string
    text?: string
}

export interface ResultAnswer {
    id: string
    text: string
    isCorrect: boolean
    isSelected: boolean
}

export interface ResultQuestion {
    id: string
    text: string
    answers: ResultAnswer[]
}

export interface Metadata {
    page: number
    limit: number
    total: number
    totalPages: number
}