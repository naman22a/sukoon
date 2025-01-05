import {
    Body,
    Controller,
    Get,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { TipsDto } from './types';
import { PrismaService } from '../../prisma';

@Controller('tips')
export class TipsController {
    constructor(private prisma: PrismaService) {}

    @Get()
    async tips() {
        return await this.prisma.tip.findMany();
    }

    @Post()
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: path.join(process.cwd(), 'uploads'),
                filename: (req, file, callback) => {
                    const uniqueSuffix =
                        Date.now() + '-' + Math.round(Math.random() * 1e9);
                    const ext = path.extname(file.originalname);
                    callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
                },
            }),
        }),
    )
    async addTip(
        @Body() body: TipsDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        await this.prisma.tip.create({
            data: {
                ...body,
                latitude: Number(body.latitude),
                longitude: Number(body.longitude),
                filePath: `/uploads/${file.filename}`,
            },
        });
        return {
            ok: true,
            filePath: `/uploads/${file.filename}`,
        };
    }
}
