import { IsNotEmpty, Length } from 'class-validator';

export class InputSearchDto  {
    @IsNotEmpty()
    @Length(2,255)
    text: string;
}