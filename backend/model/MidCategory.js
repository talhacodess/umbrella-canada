import mongoose from "mongoose";
const Schema = mongoose.Schema;

const questionAnswerSchema = new Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  }
});


const midcategorySchema = new Schema({
  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brands",
  },
  title: {
    type: String,
    require: true,
  },
 metaTitle: { type: String },
  metaDescription: { type: String },
  keywords: { type: String },
  robots: { type: String },
   slug: {
    type: String,
    unique: true,
  },
  subTitle: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  details: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    require: true,
  },
   iconAltText:{
     type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
   imageAltText:{
     type: String,
    require: true,
  },
  videoUpperHeading:{
     type: String,
    require: false,
  },
  videoUpperDescription:{
     type: String,
    require: false,
  },
  videoLink: {
    type: String,
    require: true,
  },
  videoDescription: {
    type: String,
    require: false,
  },
  bannerTitleFirst: {
    type: String,
    require: true,
  },
  bannerContentFirst: {
    type: String,
    require: true,
  },
  bannerImageFirst: {
    type: String,
    require: true,
  },
   bannerImageFirstAltText:{
     type: String,
    require: true,
  },
  bannerBgColor: {
    type: String,
    default: "",
  },
  faqImage: {
    type: String,
    default: "",
  },
  faqImageAltText: {
    type: String,
    default: "",
  },
  showBottomHero: {
    type: Boolean,
    default: false,
  },
  showTrustBanner: {
    type: Boolean,
    default: false,
  },
  showServiceSelectionCard: {
    type: Boolean,
    default: false,
  },
  qna: [questionAnswerSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },

  status: {
    type: String,
    enum: ["pending", "approved"],
    default: "pending",
  },
});

midcategorySchema.index({ slug: 1 }, { unique: true });
midcategorySchema.index({ title: 1 });
midcategorySchema.index({ brandId: 1, status: 1 });
midcategorySchema.index({ createdAt: -1 });

export const MidCategory = mongoose.model("MidCategory", midcategorySchema);
