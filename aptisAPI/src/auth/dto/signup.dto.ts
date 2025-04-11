import { ApiProperty } from "@nestjs/swagger";

export class BodySignup {
    @ApiProperty({ example: 'abc@gmail.com' })
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    name: string;

    @ApiProperty({
        description: 'The role of the user, could be admin, instructor, or student',
        example: 'admin',
        required: false,
    })
    role?: 'admin' | 'instructor' | 'student'; 

    @ApiProperty({
        example: 'active',
        required: false,
    })
    status: string;

}
