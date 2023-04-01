import { CreateUserDto, SignInUserDto } from './dto/users.dto';
export class Message {
    text: string;

    constructor(text) {
        this.text = text
    }
}
export class BodyMessage {
    data: SignInUserDto;

    constructor(data) {
        this.data = data
    }
}