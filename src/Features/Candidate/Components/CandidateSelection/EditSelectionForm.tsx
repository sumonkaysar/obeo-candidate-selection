import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  editSelection,
  removeEditId,
  selectCandidateSelectionData,
} from "@/Features/Candidate/selectionCandidateSlices/SelectionCandidate.slice";
import type { ISelectedCandidate } from "@/Features/Candidate/types/candidate-selection.type";
import { candidateSelectionZodSchema } from "@/Features/Candidate/validations/candidate-selection.validation";
import { useAppDispatch, useAppSelector } from "@/Redux/hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type z from "zod";

const EditSelectionForm = () => {
  const { shortlistCandidates, selectedCandidates, editId } = useAppSelector(
    selectCandidateSelectionData
  );
  const dispatch = useAppDispatch();
  const prevData = selectedCandidates.find((c) => c.candidateId === editId);
  const form = useForm({
    resolver: zodResolver(candidateSelectionZodSchema),
    values: {
      candidate:
        shortlistCandidates.find((c) => c.candidateId === editId)?._id || "",
      employeeId: prevData?.employeeId || "",
      selectionTerms: prevData?.selectionTerms || "",
    },
  });

  const handleSubmit = async (
    data: z.infer<typeof candidateSelectionZodSchema>
  ) => {
    try {
      const selectedCandidate = shortlistCandidates.find(
        (candidate) => candidate._id === data.candidate
      );

      let updatedData = {} as Partial<ISelectedCandidate>;

      if (prevData?.candidateId !== selectedCandidate?.candidateId) {
        updatedData = {
          ...updatedData,
          firstName: selectedCandidate?.firstName,
          lastName: selectedCandidate?.lastName,
          candidateId: selectedCandidate?.candidateId,
          position: selectedCandidate?.position,
        };
      }

      if (prevData?.employeeId !== data.employeeId) {
        updatedData = {
          ...updatedData,
          employeeId: data.employeeId,
        };
      }

      if (prevData?.selectionTerms !== data.selectionTerms) {
        updatedData = {
          ...updatedData,
          selectionTerms: data.selectionTerms,
        };
      }

      console.log(updatedData);

      dispatch(editSelection(updatedData));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog
      open={!!editId}
      onOpenChange={(open: boolean) => {
        if (!open) {
          dispatch(removeEditId());
        }
      }}
    >
      <form>
        <DialogContent
          className="p-0 overflow-hidden min-w-11/12"
          aria-describedby="Add Selection"
        >
          <DialogHeader className="sr-only">
            <DialogTitle className="text-xl">Edit Selection</DialogTitle>
            <DialogDescription>Here you will Edit selection</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="border">
              <h2 className="text-xl font-semibold border-b pt-1 pb-3 px-4">
                Candidate Selection
              </h2>
              <Form {...form}>
                <form
                  id="addSelection"
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="space-y-6 px-6 py-4"
                >
                  <FormField
                    control={form.control}
                    name="candidate"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                        <FormLabel className="justify-end text-[#212529]">
                          Candidate<span className="text-red-500">*</span>
                        </FormLabel>
                        <Select {...field}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a candidate to shortlist" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {shortlistCandidates.map((candidate) => (
                              <SelectItem
                                key={candidate._id}
                                value={candidate._id}
                              >
                                {candidate.firstName} {candidate.lastName} (
                                {candidate.candidateId})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription className="sr-only">
                          Select a candidate
                        </FormDescription>
                        <div />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="employeeId"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                        <FormLabel className="justify-end text-[#212529]">
                          Employee Id <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Employee Id" {...field} />
                        </FormControl>
                        <FormDescription className="sr-only">
                          Enter Employee Id.
                        </FormDescription>
                        <div />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="selectionTerms"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                        <FormLabel className="justify-end text-[#212529]">
                          Selection Terms{" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Selection Terms" {...field} />
                        </FormControl>
                        <FormDescription className="sr-only">
                          Enter Selection Terms.
                        </FormDescription>
                        <div />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </div>
          </div>
          <DialogFooter className="p-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" form="addSelection">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default EditSelectionForm;
