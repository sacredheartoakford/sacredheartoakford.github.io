import React from 'react';
import { feesData } from '../data/fees';

const FeesPage: React.FC = () => {
  return (
    <div className="py-12 bg-[#f6f7fd] min-h-screen">
      <div className="container mx-auto px-6 sm:px-8">
        <h1 className="text-3xl font-bold text-[#26262c] mb-8">Boarding Fees</h1>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-[#26262c] mb-6">2024/2025 Fee Structure</h2>

          <div className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-[#f6f7fd]">
                  <th className="py-3 px-4 text-left text-[#26262c] font-semibold">Fees</th>
                  <th className="py-3 px-4 text-center text-[#26262c] font-semibold">Term 1</th>
                  <th className="py-3 px-4 text-center text-[#26262c] font-semibold">Term 2</th>
                  <th className="py-3 px-4 text-center text-[#26262c] font-semibold">Term 3</th>
                  <th className="py-3 px-4 text-center text-[#26262c] font-semibold">Term 4</th>
                  <th className="py-3 px-4 text-center text-[#26262c] font-semibold">Annual Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-4 font-medium text-[#26262c]">Tuition</td>
                  <td className="py-4 px-4 text-center">{feesData.tuition.term1}</td>
                  <td className="py-4 px-4 text-center">{feesData.tuition.term2}</td>
                  <td className="py-4 px-4 text-center">{feesData.tuition.term3}</td>
                  <td className="py-4 px-4 text-center">{feesData.tuition.term4}</td>
                  <td className="py-4 px-4 text-center font-bold">{feesData.tuition.annual}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-4 font-medium text-[#26262c]">Boarding</td>
                  <td className="py-4 px-4 text-center">{feesData.boarding.term1}</td>
                  <td className="py-4 px-4 text-center">{feesData.boarding.term2}</td>
                  <td className="py-4 px-4 text-center">{feesData.boarding.term3}</td>
                  <td className="py-4 px-4 text-center">{feesData.boarding.term4}</td>
                  <td className="py-4 px-4 text-center font-bold">{feesData.boarding.annual}</td>
                </tr>
                <tr className="bg-[#f6f7fd]">
                  <td className="py-4 px-4 font-bold text-[#26262c]">Total</td>
                  <td className="py-4 px-4 text-center font-bold">{feesData.total.term1}</td>
                  <td className="py-4 px-4 text-center font-bold">{feesData.total.term2}</td>
                  <td className="py-4 px-4 text-center font-bold">{feesData.total.term3}</td>
                  <td className="py-4 px-4 text-center font-bold">{feesData.total.term4}</td>
                  <td className="py-4 px-4 text-center font-bold text-[#4747d7] text-lg">{feesData.total.annual}</td>
                </tr>
              </tbody>
            </table>
            <div className="bg-[#f6f7fd] py-3 px-4 text-sm text-[#76767f]">
              * Fees are for the 2024/2025 academic year
            </div>
          </div>

          <div className="mt-8 bg-[#f6f7fd] p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-[#26262c] mb-4">Fee Payment Information</h3>
            <ul className="list-disc pl-5 text-[#76767f] space-y-2">
              <li>Fees are payable per term, due on the first day of each term</li>
              <li>Late payments will incur a penalty fee of 10% per month</li>
              <li>Payment methods: Electronic Funds Transfer, Stop Orders, or Cashier's Cheque</li>
              <li>Financial assistance is available for qualifying families</li>
              <li>All fees include textbooks, stationery, and basic school supplies</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeesPage;