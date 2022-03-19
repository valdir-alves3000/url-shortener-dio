import { Request, Response } from "express";
import shortId from "shortid";
import { config } from "../config/Constants";
import { URLModel } from "../database/model/URL";

export class URLController {
  public async shorten(req: Request, response: Response): Promise<void> {
    const originURL = req.body.originURL;

    const url = await URLModel.findOne({ originURL });
    if (url) {
      response.render("index", {
        originURL,
        hash: url.hash,
        shortURL: url.shortURL,
      });
      return;
    }

    const hash = shortId.generate();
    const shortURL = `${config.API_URL}/${hash}`;
    await URLModel.create({ hash, shortURL, originURL });

    response.render("index", { originURL, hash, shortURL });
  }

  public async redirect(req: Request, response: Response): Promise<void> {
    const { hash } = req.params;
    const url = await URLModel.findOne({ hash });

    if (url) {
      response.redirect(url.originURL);
      return;
    }

    response.status(400).json({ error: "URL not found" });
  }
}
