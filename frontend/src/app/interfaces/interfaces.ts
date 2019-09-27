export interface board {
    id: number,
    name: string,
    board_picture: string,
    description: string,
    board_url: string,
    joining_code: string
}

export interface task {
    id: string,
    title: string,
    description: string,
    points: number,
    priority: string,
    status: string,
    repeat_task: boolean,
    assigned_to: number,
    board: number
}