import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
// @ts-ignore
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppModule (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('app should be defined', () => {
        expect(app).toBeDefined();
    });

    // it('/ (GET)', () => {
    // return request(app.getHttpServer())
    // .get('/')
    // .expect(200)
    // .expect('Hello World!');
    // });
});
