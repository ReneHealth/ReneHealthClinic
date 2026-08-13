"use client";
import { useState } from "react";
import ScrollScene from "@/components/ui/ScrollScene";
import TeamList from "./TeamList";
import TeamPopup from "../TeamPopup";
import type { TeamMemberType, TeamSectionType } from "@/lib/teamContent";
interface TeamSectionProps {
  content: TeamSectionType;
}
export default function TeamSection({ content }: TeamSectionProps) {
  const [selectedMember, setSelectedMember] = useState<TeamMemberType | null>(
    null,
  );
  return (
    <>
      <ScrollScene>
        <TeamList content={content} onSelectMember={setSelectedMember} />
      </ScrollScene>
      <TeamPopup
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </>
  );
}
