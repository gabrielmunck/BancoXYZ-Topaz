import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import image1 from "../assets/imagem1.jpg";
import image2 from "../assets/imagem2.jpg";
import image3 from "../assets/imagem3.jpg";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface CarouselItem {
    image: any;
    text: string;
}

const carouselItems: CarouselItem[] = [
    {
        image: image1,
        text: "Peça ja seu empréstimo com taxa zero nos primeiros 1s2 meses",
    },
    {
        image: image2,
        text: "Comece agora a planejar seu futuro com os investimentos mais rentaveis",
    },
    {
        image: image3,
        text: "Cashback na fatura? Com o Banco XYZ você tem!",
    },
];

export default function Carousel() {
    return (
        <Swiper
            data-testid="mock-carousel"
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
                delay: 2000, //
                disableOnInteraction: false,
            }}
            className="custom-swiper"
        >
            {carouselItems.map((item, index) => (
                <SwiperSlide key={index}>
                    <div className="w-full h-full">
                        <img
                            src={item.image}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-[300px] object-cover rounded-lg"
                        />
                        <p className="text-center text-text-light text-md md:text-xl font-bold p-4 rounded-b-lg ">
                            {item.text}
                        </p>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
