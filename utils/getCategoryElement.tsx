import BankTransaction from "@/assets/svg/BankTransaction";
import DonationTransaction from "@/assets/svg/DonationTransaction";
import EducationTransaction from "@/assets/svg/EducationTransaction";
import EntertainmentTransaction from "@/assets/svg/EntertainmentTransaction";
import FoodTransaction from "@/assets/svg/FoodTransaction"
import GiftingsTransaction from "@/assets/svg/GiftingsTransaction";
import HealthTransaction from "@/assets/svg/HealthTransaction";
import HomeTransaction from "@/assets/svg/HomeTransaction";
import IncomeTransaction from "@/assets/svg/IncomeTransaction";
import MiscellaneousTransaction from "@/assets/svg/MiscellaneousTransaction";
import ReceiptTransaction from "@/assets/svg/RecieptTransaction";
import SavingsTransaction from "@/assets/svg/SavingsTransaction";
import ShoppingTransaction from "@/assets/svg/ShoppingTransaction";
import SubscriptionTransaction from "@/assets/svg/SubscriptionTransaction";
import TransportTransaction from "@/assets/svg/TransportTransaction";

const getCategoryElement = (category: string) => { 
    if (category === "food") {
        return { elem: <FoodTransaction />, backgroundColor: "#FFE0B2" };
    }
    else if (category === "transport") {
        return { elem: <TransportTransaction />, backgroundColor: "#B3E5FC" };
    }
    else if (category === "shopping") {
        return { elem: <ShoppingTransaction />, backgroundColor: "#E1BEE7" };
    } else if (category === "bills") {
        return { elem: <ReceiptTransaction />, backgroundColor: "#FFE082" };
    } else if (category === "entertainment") {
        return {
            elem: <EntertainmentTransaction />,
            backgroundColor: "#F8BBD0",
        };
    } else if (category === "savings") {
        return { elem: <SavingsTransaction />, backgroundColor: "#C8E6C9" };
    } else if (category === "health") {
        return { elem: <HealthTransaction />, backgroundColor: "#FFCDD2" };
    } else if (category === "education") {
        return { elem: <EducationTransaction />, backgroundColor: "#C5CAE9" };
    } else if (category === "subscriptions") {
        return { elem: <SubscriptionTransaction />, backgroundColor: "#B2EBF2" };
    } else if (category === "giftings") {
        return { elem: <GiftingsTransaction />, backgroundColor: "#FFF9C4" };
    } else if (category === "home") {
        return { elem: <HomeTransaction />, backgroundColor: "#D7CCC8" };
    } else if (category === "income") {
        return { elem: <IncomeTransaction />, backgroundColor: "#C8E6C9" };
    } else if (category === "bank charges") {
        return { elem: <BankTransaction />, backgroundColor: "#CFD8DC" };
    } else if (category === "donations") {
        return { elem: <DonationTransaction />, backgroundColor: "#E1BEE7" };
    } else {
        return { elem: <MiscellaneousTransaction />, backgroundColor: "#E0E0E0" };
    }
}

export default getCategoryElement;