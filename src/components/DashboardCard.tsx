import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

interface CardProps {
    cardTitle: String,
    cardContentCount: Number,
    cardDetailsPath: String,
    cardBg: string,
}

const DashboardCard: React.FC<CardProps> = ({ cardTitle, cardContentCount, cardDetailsPath, cardBg }) => {

    return (
        <Card className={`bg-gradient-to-br ${cardBg} text-white w-80`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className=" font-medium text-lg">{cardTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{String(cardContentCount)}</div>
          <a href={String(cardDetailsPath)} className="text-xs text-slate-200 hover:underline cursor-pointer">View Details</a>
        </CardContent>
      </Card>
    )
}

export default DashboardCard;