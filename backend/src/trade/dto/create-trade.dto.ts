import { IsNotEmpty } from "class-validator";

export class CreateTradeDto {
    @IsNotEmpty()
    fileid: string;

    @IsNotEmpty()
    name: string;
}
