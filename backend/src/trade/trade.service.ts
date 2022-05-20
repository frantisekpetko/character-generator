import { Injectable } from '@nestjs/common';
import { resolve } from 'path';
import { CreateTradeDto } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';
import fs from 'fs';
import { Data, RawData } from '../interfaces/data.interface';
import { Logger } from '@nestjs/common';





@Injectable()
export class TradeService {

  private logger = new Logger(TradeService.name);

  findList():{ fileid: string, name: string }[] {
      const list = JSON.parse(fs.readFileSync(resolve('./src/data/seed/generator/professions/list/list.json'), 'utf8'));
      return list;
  }

  create(createTradeDto: CreateTradeDto) {
      const list = JSON.parse(fs.readFileSync(resolve('./src/data/seed/generator/professions/list/list.json'), 'utf8'));
      console.log(JSON.stringify(createTradeDto));
      const updatedData = [...list, createTradeDto];
      fs.writeFile(
          './src/data/seed/generator/professions/list/list.json',
          JSON.stringify(updatedData, null, 4),
          'utf8',
          () => console.log('Updated list done!'),
      );
  }

  findAll():Data[] {
    let data: Data[] | null = [];

    const list = JSON.parse(fs.readFileSync(resolve('./src/data/seed/generator/professions/list/list.json'), 'utf8'));
    list.forEach((item, index) => {
        console.log(`professions/house.${item.fileid}.json`);
        let sector = JSON.parse(fs.readFileSync(resolve(`./src/data/seed/generator/professions/house.${item.fileid}.json`), { encoding: 'utf8', flag: 'r' }));
        sector.fileid = item.fileid;
        data.push(sector);
        
    });

    return data;
  }


  findAllRaw(): RawData[] {
      const data = JSON.parse(fs.readFileSync(resolve('./src/data/seed/generator/professions/trades/trades.json'), 'utf8'));
      return data;
  }

  findOne(id: number, fileid: string) {
    let data: Data | null = null;
    const name = fileid;
    const list = JSON.parse(fs.readFileSync(resolve('./src/data/seed/generator/professions/list/list.json'), 'utf8'));
    list.forEach((item, index) => {
        //console.log(`professions/house.${item.fileid}.json`);
        if (name === item.fileid) {
            const sector = fs.readFileSync(resolve(`./src/data/seed/generator/professions/house.${item.fileid}.json`), { encoding: 'utf8', flag: 'r' });
            data = JSON.parse(sector).profession[id];
            data.fileid = item.fileid;
        }
    });
    this.logger.log(data, 'data')
    return data;
  }

  update(id: number, updateTradeDto: UpdateTradeDto) {
    return `This action updates a #${id} trade`;
  }

  remove(id: number) {
    return `This action removes a #${id} trade`;
  }
}
