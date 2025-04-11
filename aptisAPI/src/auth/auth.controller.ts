import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { bodyLogin } from './dto/login.dto';
import { BodySignup } from './dto/signup.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from 'src/interfaces';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @HttpCode(200) 

  @Post('login')
  login(@Body() bodyLogin: bodyLogin ){
    try{
      return this.authService.login(bodyLogin)
    }
    catch(exception){
      if(exception.status != 500){
        throw new HttpException(exception.response, exception.status)
      }
      throw new HttpException('Lỗi...', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  } 
  
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('get-info')  
  async getMyInfo(@Req() req: RequestWithUser) {
    const userId = req.user.data.user_id; 
    return this.authService.getMyInfo(userId);
}


  @Post('signup')
  signup(@Body() bodySignup:BodySignup){
    return this.authService.signup(bodySignup)
  }


}
