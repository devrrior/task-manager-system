import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface ResponseFormat {
  data: any;
  success: boolean;
  message: string;
  httpStatus: number;
}

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: Partial<ResponseFormat>) => {
        const response = context.switchToHttp().getResponse();
        const status = response.statusCode;

        return {
          data: data.data !== undefined ? data.data : data,
          success: data.success !== undefined ? data.success : true,
          message:
            data.message !== undefined ? data.message : 'Request successful',
          httpStatus: status,
        };
      }),
    );
  }
}
