import { Button } from "@/components/ui/button";
import AddSelectionForm from "@/Features/Recruitment/Components/CandidateSelection/AddSelectionForm";
import SelectionTable from "@/Features/Recruitment/Components/CandidateSelection/SelectionTable";

const CandidateSelection = () => {
  return (
    <div className="px-3 py-2 bg-[#F4F4F5] min-h-screen">
      <div className="bg-white shadow-md rounded-xs mx-auto border">
        <div className="flex justify-between items-center border-b py-3 px-4">
          <h2 className="text-xl font-semibold">Candidate Selection</h2>
          <div className="flex items-center gap-3">
            <AddSelectionForm />
            <Button>Manage Selection</Button>
          </div>
        </div>
        <div className="px-4 py-3">
          <SelectionTable />
        </div>
      </div>
    </div>
  );
};

export default CandidateSelection;
