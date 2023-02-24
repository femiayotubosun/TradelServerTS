import * as SibApiV3Sdk from "sib-api-v3-sdk";

import {
  IEmailDriver,
  SendBulkEmailArgs,
  SendEmailArgs,
} from "Lib/Infra/External/Email/";
import { emailConfig } from "Config/emailConfig";

export class SendInBlueDriver implements IEmailDriver {
  transactionEmailApi;

  constructor() {
    SibApiV3Sdk.ApiClient.instance.authentications["api-key"].apiKey =
      this.getApiKey();
    this.transactionEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();
  }

  sendBulkEmail(sendBulkEmailArgs: SendBulkEmailArgs): null {
    console.log(sendBulkEmailArgs);
    return null;
  }

  public async sendEmail(sendEmailArgs: SendEmailArgs): Promise<null> {
    const { subject, body, to } = sendEmailArgs;

    return await this.transactionEmailApi.sendTransacEmail({
      sender: {
        email: emailConfig.emailFromEmail,
        name: emailConfig.emailFromName,
      },
      subject,
      htmlContent: `<h3>${body}</h3>`,
      messageVersions: [
        {
          to: [{ email: to }],
        },
      ],
    });
  }

  private getApiKey() {
    return emailConfig.sendinblue.apiKey;
  }
}
