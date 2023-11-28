import {Metadata} from "next";

export default function Home() {
  return (
    <div>
      Hello world
    </div>
  )
}



export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Issue Tracker - Dashboard',
    description: 'View a summary of project issues'
};