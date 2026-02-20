import React from "react";
import Tabs from "../common/Tabs";
import SpecialCard from "../common/SpecialCard";
import ProducedCard from "../common/ProducedCard";
import background from '../../assets/images/abstract-bg.png';
const CustomPackagingProduced = () => {
  const customBox = [
    {
      id: 1,
      title: "Price Quote",
      data: [
        {
          title: "Instant Price Quote",
          desc: "Get an instant price quote for your customized packaging project within 20 minutes. You can submit a form, email, or call us.",
        },
        {
          title: "Price Matching ",
          desc: "Match the price with your budget and let us know about it. We will try our best to give you the economical price quote.",
        },
        {
          title: "Price Approval",
          desc: "Give us approval on the prices so that we can proceed with the order. You will find us the best in the custom packaging line.",
        },
      ],
    },
    {
      id: 2,
      title: "Design Approval",
      data: [
        {
          title: "Mockup Designing ",
          desc: "Send us your artwork so that we can design a 3D digital mockup of the box. If you have/are a designer, then you can ask for a dieline as well.",
        },
        {
          title: "Artwork Revisions",
          desc: "If you find any mistakes or have any suggestions, feel free to ask your representative for the revisions until you are satisfied with the best.",
        },
        {
          title: "Mockup Approval",
          desc: "After receiving the 3D digital mockup of the box, please give us approval on the mockup if everything looks good to you.",
        },
      ],
    },
    {
      id: 3,
      title: "Payment",
      data: [
        {
          title: "Credit/Debit Card",
          desc: "You can make the payment by requesting a payment link from your representative using your debit or credit card via a secure merchant.",
        },
        {
          title: "Wire/ACH Transfer",
          desc: "You can make the payment through ACH or Wire Transfer to our bank if it is best suited for you. You can request our bank account details.",
        },
        {
          title: "PayPal / Google Pay",
          desc: "If you are a PayPal user, then you can simply transfer the amount by requesting a PayPal invoice from us. The same goes for Google Pay.",
        },
      ],
    },
    {
      id: 2,
      title: "Production",
      data: [
        {
          title: "Final Approval",
          desc: "Our representative will send you a final specification sheet, which includes all the necessary details of your project for final approval.",
        },
        {
          title: "Prototyping/Sampling",
          desc: "We will do a sample run of your project if it is requested or needed by us to make the best version of the final products. We need your approval on this.",
        },
        {
          title: "The Production",
          desc: "We will start the production after the final approval or after sample approval (if needed). The order will be produced as per the committed time.",
        },
      ],
    },
    {
      id: 2,
      title: "Shipping",
      data: [
        {
          title: "QC Analysis",
          desc: "After the production, our quality control department operates the QC analysis to pass or reject the production and to ensure quality.",
        },
        {
          title: "Shipping",
          desc: "The order will be shipped after the QC analysis. The tracking ID will be provided with every day updates until it is delivered safely.",
        },
        {
          title: "Customer’s Feedback",
          desc: "The customer’s feedback really matters to us, so we urge customers to give their feedback on the project we delivered.",
        },
      ],
    },
    {
      id: 2,
      title: "Recorders",
      data: [
        {
          title: "Dedicated Support Person",
          desc: "We appoint a dedicated support person to your every upcoming project to keep you in the loop. In this way, your future order placement would be just one email away.",
        },
        {
          title: "Heavy Discounts",
          desc: "The support person will constantly follow up with you to inform you of our heavy bulk order, month end, and occasional discounts. This will save you the big.",
        },
        {
          title: "Ultimate Business Partnership",
          desc: "We will provide the best of ourselves to take this beautiful business relationship to new heights. We will be there with you side by side.",
        },
      ],
    },
  ];

  const data = customBox.map((box) => ({
    title: box.title,
    content: <ProducedCard {...box} />,
  }));

  return (

    
    <div className="bg-[#F7F7F7] py-10">
      <div 
        className="w-full max-w-[95%] sm:max-w-8xl  sm:p-4  rounded-xl mx-auto relative"
      >
        <div className="relative z-10">
          <div className="text-center pb-3 px-2">
            <h2 className="sm:text-[35px] text-[25px] font-sans font-[600] text-[#333333] break-words">
              5 Simple Steps to Get Your Custom Packaging 

            </h2>
            <p className="py-3 text-gray-600 break-words">
            X Custom Packaging is a one-stop shop where you can meet your every packaging demand, as we made the order placement as easy as it is child's play.
 
            </p>
          </div>
          <div className="w-full overflow-hidden">
            <Tabs defaultTab={"Price Quote"} className={'bg-white'} tabs={data} />
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default CustomPackagingProduced;
