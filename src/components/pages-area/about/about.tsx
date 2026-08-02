import { useState } from "react";
import { Typography } from "@mui/material";
import "./about.css";

// Personal details shown on the page — edit here.
const developer = {
    name: "Ron Kadouri",
    role: "Full-Stack Web Development Student",
    email: "Ron@xi-md.com",
    // Drop your photo at public/profile.jpg — a placeholder avatar
    // is shown until the file exists.
    photo: "/profile.jpg",
};

const technologies = [
    "React 19", "TypeScript", "Redux Toolkit", "React Router",
    "Material UI", "Chart.js", "Axios", "Vite",
];

export function About() {
    const [photoMissing, setPhotoMissing] = useState(false);

    return (
        <div className="About">

            <div className="AboutHeader">
                <Typography className="AboutTitle">About</Typography>
                <Typography className="AboutSubtitle">
                    The project and the developer behind it
                </Typography>
            </div>

            <div className="AboutCards">

                <section className="AboutCard AboutProfile">
                    {photoMissing ? (
                        <div className="AboutPhoto AboutPhotoFallback">
                            <svg width="56" height="56" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="1.6"
                                strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="8" r="4" />
                                <path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" />
                            </svg>
                        </div>
                    ) : (
                        <img
                            className="AboutPhoto"
                            src={developer.photo}
                            alt={developer.name}
                            onError={() => setPhotoMissing(true)}
                        />
                    )}

                    <Typography className="AboutName">{developer.name}</Typography>
                    <Typography className="AboutRole">{developer.role}</Typography>

                    <a className="AboutEmail" href={"mailto:" + developer.email}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="1.8"
                            strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="4" width="20" height="16" rx="2" />
                            <path d="m2 7 10 7 10-7" />
                        </svg>
                        {developer.email}
                    </a>
                </section>

                <section className="AboutCard AboutProject">
                    <Typography className="AboutProjectTitle">
                        Crypto Analyzer
                    </Typography>

                    <Typography className="AboutText">
                        Crypto Analyzer is a single-page application for tracking
                        cryptocurrency markets in real time. The Home page lists the
                        top coins traded against the US dollar, with live exchange
                        rates and detailed market data one click away, and lets you
                        mark up to five coins to follow.
                    </Typography>

                    <Typography className="AboutText">
                        The Reports page charts the marked coins' USD prices live —
                        a single batched request per second brings the prices of all
                        selected coins at once. The Recommendations page goes a step
                        further: it feeds each coin's current market data to an AI
                        advisor that answers whether the coin is worth buying right
                        now, and explains why.
                    </Typography>

                    <div className="AboutTech">
                        {technologies.map(tech => (
                            <span className="AboutTechChip" key={tech}>{tech}</span>
                        ))}
                    </div>
                </section>

            </div>

        </div>
    );
}
