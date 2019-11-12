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

export interface taskList {
    todo: task[],
    inProgress: task[],
    completed: task[]
}

export interface member {
    username: string,
    score: number,
    is_admin: boolean
}

export interface memberList {
    members: member[],
    
}
