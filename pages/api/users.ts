import { MazAdapter } from "@/lib/adapter";
import { INotificationConfig } from "@/models/notification.interface";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { hashPassword } from "@/lib/bcrypt";
import { db } from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { UserEntity } from "@/lib/adapter/entities/UserEntity";
import { MazDataSource } from "@/lib/adapter/data-source";

type Data = {
  msg?: string;
  data?: any;
  total_count?: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  return new Promise(async (resolve, reject) => {
    let DS = await MazDataSource;
    switch (req.method) {
      case "GET":
        // search
        // console.log(req.query);
        if (req.query.search !== undefined) {
          // send back search res
          // getting maz id from search
          // db("users")
          //   .whereLike("id_orders", req.query.search)
          //   .then((data: IOrderResponse[]) => {
          //     res.status(200).json({ data: data });
          //     resolve(data);
          //   });
        }

        if (req.query.id) {
          // single response
          const id = req.query.id;
          const idUser = await DS?.manager.findOne(UserEntity, {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              email: true,
              phone: true,
              default_address: true,
              avatar_url: true,
              is_admin: true,
              is_notifications_enabled: true,
              age: true,
              gender: true,
            },
            where: {
              id: id as string,
            },
          });
          res.status(200).json({ data: idUser });
          resolve({ data: idUser });
        } else if (req.query.email) {
          MazAdapter().getUserByEmail(req.query.email as string);
        } else {
          // paginate
          // get results and count of results
          // console.log(req.query);
          let per_page = req.query.per_page
            ? (req.query.per_page as string)
            : "6";
          let page = req.query.page ? (req.query.page as string) : "0";

          const paginatedUsers = await DS?.manager.find(UserEntity, {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              email: true,
              phone: true,
              default_address: true,
              avatar_url: true,
              is_admin: true,
              is_notifications_enabled: true,
              age: true,
              gender: true,
            },
            skip: parseInt(per_page) * parseInt(page),
            take: parseInt(per_page),
          });

          const allUsersCount = await DS?.getRepository(
            UserEntity
          ).findAndCount();

          let responseObj: Data = {
            data: paginatedUsers,
            total_count: allUsersCount ? allUsersCount[1] : 0,
            msg: "successful",
          };
          // console.log(responseObj);
          res.status(200).json(responseObj);
          resolve(responseObj);
        }

        break;

      case "POST":
        // create new user
        // default icon avatar url
        console.log(req.body);
        // hash pass
        try {
          const hash = hashPassword(req.body.password);
          const createduser = await MazAdapter().createUser({
            ...req.body,
            password: hash,
          });
          console.log(createduser);
          res.json(createduser);
          resolve(createduser);
          // db("notification_config")
          //   .where("id_notification_config", 3)
          //   .first()
          //   .then(async (welcomeNotificationConfig: INotificationConfig) => {
          //     if (welcomeNotificationConfig.is_enabled_notification_config) {
          //       // send welcome message to new account
          //       db("notifications")
          //         .insert({
          //           user_id: data[0],
          //           title_notifications: "Welcome to MazExpress!",
          //           content_notifications:
          //             "Thank you for choosing MazExpress as your delivery service, hope you have a wonderful shopping experience, please get in touch with us for any queries or issues by going to help-center.",
          //         })
          //         .then((data: any) => {
          //           res.status(200).json(data);
          //           resolve(data);
          //         });
          //     }
          //   });
        } catch (err) {
          if (err) throw err;
          console.log(err);
          res
            .status(500)
            .json({ msg: "an error occurred check console for more info" });
          reject();
        }

        break;

      case "PUT":
        // console.log("request received");
        if (req.query.id) {
          const id = req.query.id;
          const fields = { ...req.body };

          if (req.body.password) {
            // change pass
            const hash = hashPassword(req.body.password);
            fields.password = hash;
          }
          let updateUserResult = await DS?.getRepository(UserEntity).update(
            id,
            fields
          );
          console.log(updateUserResult);
          res.status(200).json({data: updateUserResult});
          resolve(updateUserResult);
          // db("users")
          //   .where("id_users", id)
          //   .update(fields)
          //   .then((data: any) => {
          //     console.log("updated user!");
          //     db.select(
          //       "id_users",
          //       "first_name_users",
          //       "last_name_users",
          //       "email_users",
          //       "phone_users",
          //       "default_address_users",
          //       "avatar_url_users",
          //       "is_notifications_enabled_users",
          //       "is_admin_users",
          //       "is_logged_in_users"
          //     )
          //       .from("users")
          //       .where("id_users", id)
          //       .then((data: any) => {
          //         res.status(200).json(data);
          //         resolve(data);
          //       });
          //   });
        } else {
          // error response
          res.status(200).json({ msg: "invalid url params" });
          reject();
        }
        break;

      case "DELETE":
        if (req.query.id) {
          const id = req.query.id;

          db("users")
            .where("id_users", id)
            .del()
            .then((data: any) => {
              res.status(200).json(data);
              resolve(data);
            });
        } else {
          // error response
          res.status(200).json({ msg: "invalid url params" });
          reject();
        }
        break;

      default:
        res.status(200).json({ msg: "default" });
        reject();
    }
  });
}
