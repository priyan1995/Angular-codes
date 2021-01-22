export class MarksSheet{
    id?: number;
    student_name?: string;
    service_name?: string;
    date?: string;
    total_questions?: number

}

export class MarkSheet{
    section_id?: number;
    section_name?: string; 
    questions?: Question[];
}

export class Question{
    question_id?: number;
    name?: string;
    marks?: number;
}