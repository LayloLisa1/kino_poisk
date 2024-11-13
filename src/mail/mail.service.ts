import { Injectable } from "@nestjs/common";
import { User } from "src/user/model/user.model";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(user:User){
    const url = `${process.env.API_URL}:${process.env.PORT}/api/auth/activate/${user.activation_link}`;
    await this.mailerService.sendMail({
      to: user.email,
      subject: "KinoPoisk Api",
      template: "./confirm",
      context: {
        full_name: user.username,
        url,
      },
    });
  }


}
