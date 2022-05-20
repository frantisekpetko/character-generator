import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TradeService } from './trade.service';
import { CreateTradeDto } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';
import { Data, RawData } from '../interfaces/data.interface';
import { ForbiddenException } from '@nestjs/common';

@Controller('trade')
export class TradeController {
  constructor(private readonly tradeService: TradeService) {}

  @Post()
  create(@Body() createTradeDto: CreateTradeDto) {
    return this.tradeService.create(createTradeDto);
  }


   @Get('list')
   findList(): {fileid: string, name: string}[] {
    return this.tradeService.findList();
   }

  @Get('raw')
    findAllRaw(): RawData[] {
    return this.tradeService.findAllRaw();
  }


  @Get()
    findAll(): Data[] {
    return this.tradeService.findAll();
  }

  @Get(':fileid/:id')
  findOne(@Param('id') id: string, @Param('fileid') fileid: string) {
    return this.tradeService.findOne(+id, fileid);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTradeDto: UpdateTradeDto) {
    return this.tradeService.update(+id, updateTradeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tradeService.remove(+id);
  }
}
