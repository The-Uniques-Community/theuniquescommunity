import React from 'react';
import Header from "@/utils/components/Header";
import { useTheme } from '@mui/material/styles';
import backGround from "@/assets/img/About/depositphotos_432815258-stock-illustration-geometric-ornamental-vector-pattern-seamless.jpg"

const HowHeader = () => {
    const theme = useTheme(); // Access Material-UI theme

    return (
        <div>
            <Header
                backgroundPattern={`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 60"><text x="0" y="25" fill="%23E6E8EE" font-size="60px">.</text></svg>') 0px 0px / 30px 30px rgb(241, 244, 249)`}
                chipData={{
                    count: "Over 500+",
                    label: "Unique Users",
                    chipBgColor: theme.palette.primary.main,
                }}
                heading="How It Started ✨"
                waveColor={theme.palette.primary.main} // Corrected waveColor
            />
        </div>
    );
};

export default HowHeader;
