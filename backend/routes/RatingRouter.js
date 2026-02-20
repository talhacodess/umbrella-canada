import express from "express";
import {
  createRating,
  getRatings,
  getRating,
  updateRating,
  deleteRating,
  getRatingByProductId,
  getRatingByUserId,
  getGoogleReviews,
  getOverallRating,
} from "../controller/ratingController.js";
const ratingRoute = express.Router();

ratingRoute.route("/create").post(createRating);
ratingRoute.route("/getAll").get(getRatings);
ratingRoute.route("/get/:id").get(getRating);
ratingRoute.route("/update/:id").put(updateRating);
ratingRoute.route("/delete/:id").delete(deleteRating);
ratingRoute.route("/getByProduct/:id").get(getRatingByProductId);
ratingRoute.route("/getByUser/:id").get(getRatingByUserId);
ratingRoute.route("/getOverall/:id").get(getOverallRating);
ratingRoute.route("/getAllGoogleReviews").get(getGoogleReviews);

export default ratingRoute;
