'use client';
import Layout from "@/components/Layout";
import Pricing from "@/components/Pricing";
import Hero from "@/components/Hero";
import Newsletter from "@/components/Newsletter";
import Features from "@/components/Features";
import SocialProof from "@/components/SocialProof";
import Customers from "@/components/Customers";
import ContentSection from "@/components/ContentSection";
import CallToAction from "@/components/CallToAction";


export default function Home() {
  return (
    <Layout>
      <Hero/>
      <Features/>
      <Pricing/>
      <SocialProof/>
      <ContentSection/>
      <CallToAction/>
      <Customers/>
      <Newsletter/>
    </Layout>
  )
}
