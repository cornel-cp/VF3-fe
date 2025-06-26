"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { Heading } from "@/components/ui/Heading";
import { Tooltip } from "@/components/ui/Tooltip";
import { ApiService } from "@/lib/ApiService";
import { Spinner } from "@/components/ui/Spinner";
import CharacterGeneratorPreview from "@/components/wedget/CharacterGenerationPreview";

interface CharacterForm {
  name: string;
  physicalBuild: {
    size: string;
    bodyType: string;
    height: string;
    notableFeatures: string;
  };
  combatAbilities: {
    fightingStyle: string;
    weapons: string;
    specialTechnique: string;
    experience: string;
  };
  attributes: {
    strength: number;
    speed: number;
    defense: number;
    intelligence: number;
    magicPower: number;
  };
  specialAbilities: {
    primaryPower: string;
    powerLimitation: string;
    defensiveAbility: string;
  };
  weaknesses: {
    criticalWeakness: string;
    environmentalLimitation: string;
  };
  appearance: string;
  battlePersonality: string;
}

const initialForm: CharacterForm = {
  name: "",
  physicalBuild: {
    size: "",
    bodyType: "",
    height: "",
    notableFeatures: "",
  },
  combatAbilities: {
    fightingStyle: "",
    weapons: "",
    specialTechnique: "",
    experience: "",
  },
  attributes: {
    strength: 1,
    speed: 1,
    defense: 1,
    intelligence: 1,
    magicPower: 1,
  },
  specialAbilities: {
    primaryPower: "",
    powerLimitation: "",
    defensiveAbility: "",
  },
  weaknesses: {
    criticalWeakness: "",
    environmentalLimitation: "",
  },
  appearance: "",
  battlePersonality: "",
};

const MAX_ATTRIBUTES_SUM = 35;

const tooltips = {
  name: "Choose a memorable and thematic name for your character that reflects their nature and abilities.\n\nExamples:\n'Shadowblade' - A stealthy assassin\n'Nova Prime' - A cosmic energy warrior",
  physicalBuild: {
    size: "Choose your character's overall size category.\n\nOptions:\n- Tiny (under 3ft)\n- Small (3-5ft)\n- Medium (5-7ft)\n- Large (7-9ft)\n- Massive (over 9ft)",
    bodyType:
      "Describe the character's physical form and build.\n\nExamples:\n'Athletic' - Well-balanced muscular build\n'Ethereal' - Otherworldly, floating form\n'Bulky' - Heavy, powerful physique",
    height:
      "Provide a specific height measurement.\n\nExamples:\n'6'2\"' (feet and inches)\n'1.88m' (meters)\n'188cm' (centimeters)",
    notableFeatures:
      "List 1-2 distinctive physical characteristics that make your character unique.\n\nExamples:\n'Glowing eyes, mechanical arm'\n'Crystal skin, floating hair'\n'Dragon scales, ember breath'",
  },
  combatAbilities: {
    fightingStyle:
      "Describe your character's main approach to combat.\n\nExamples:\n'Acrobatic martial arts' - Agile, flowing movements\n'Heavy weapons specialist' - Focus on powerful weapons\n'Elemental magic' - Control over natural forces",
    weapons:
      "List up to 2 primary weapons or tools used in combat.\n\nExamples:\n'Energy sword, Plasma shield'\n'Ancient staff, Rune stones'\n'Nano-enhanced fists'",
    specialTechnique:
      "Describe a signature move or unique combat ability.\n\nExamples:\n'Shadow Step - teleports behind enemies'\n'Nova Burst - explosive energy wave'\n'Time Lock - briefly freezes opponents'",
    experience:
      "Indicate combat expertise level.\n\nOptions:\n- Novice (just starting)\n- Trained (competent)\n- Veteran (highly skilled)\n- Master (exceptional)\n- Legendary (ultimate)",
  },
  attributes: {
    strength:
      "Rate physical power and lifting capacity (1-10).\n\nNOTE: Total of all attributes must be 35 or less!\n\n1-3: Below average\n4-6: Average human\n7-8: Peak human\n9-10: Superhuman",
    speed:
      "Rate movement and reaction speed (1-10).\n\nNOTE: Total of all attributes must be 35 or less!\n\n1-3: Slow\n4-6: Average human\n7-8: Olympic level\n9-10: Superhuman",
    defense:
      "Rate damage resistance and durability (1-10).\n\nNOTE: Total of all attributes must be 35 or less!\n\n1-3: Vulnerable\n4-6: Normal resilience\n7-8: Heavy armor\n9-10: Nearly invulnerable",
    intelligence:
      "Rate mental capacity and tactical thinking (1-10).\n\nNOTE: Total of all attributes must be 35 or less!\n\n1-3: Simple tactics\n4-6: Average strategy\n7-8: Tactical genius\n9-10: Superhuman intellect",
    magicPower:
      "Rate supernatural or technological abilities (1-10).\n\nNOTE: Total of all attributes must be 35 or less!\n\n1-3: Minor powers\n4-6: Moderate abilities\n7-8: Major powers\n9-10: Reality-altering",
  },
  specialAbilities: {
    primaryPower:
      "Describe the main supernatural or technological ability.\n\nExamples:\n'Psychic energy manipulation'\n'Nanite swarm control'\n'Elemental mastery'",
    powerLimitation:
      "Specify a weakness or restriction on the primary power.\n\nExamples:\n'Powers weaken in daylight'\n'Limited energy reserves'\n'Requires physical contact'",
    defensiveAbility:
      "Describe a protective technique or defensive trait.\n\nExamples:\n'Energy absorption shield'\n'Rapid regeneration'\n'Phase shifting'",
  },
  weaknesses: {
    criticalWeakness:
      "Specify a major vulnerability that can be exploited.\n\nExamples:\n'Overheats after using powers'\n'Vulnerable to sonic attacks'\n'Must recharge in sunlight'",
    environmentalLimitation:
      "Describe a situation or environment that disadvantages the character.\n\nExamples:\n'Struggles in aquatic environments'\n'Weakened by extreme cold'\n'Powers diminish underground'",
  },
  appearance:
    "Write 2-3 sentences describing your character's visual appearance. Include distinctive features, armor/clothing, and overall presence.\n\nExample:\n'A tall, cybernetically enhanced warrior with glowing blue circuits across their sleek black armor. Their face is partially hidden behind a holographic mask, with only their piercing silver eyes visible. Energy conduits pulse with power along their arms and legs.'",
  battlePersonality:
    "Write 1-2 sentences describing how your character behaves in combat.\n\nExample:\n'Calculates every move carefully, preferring to analyze opponents before striking. Known for turning enemies' strengths against them through tactical superiority and precise timing.'",
};

interface InputWithTooltipProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  tooltip: string;
}

interface TextAreaWithTooltipProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  tooltip: string;
}

const InputWithTooltip: React.FC<InputWithTooltipProps> = ({
  label,
  tooltip,
  ...props
}) => (
  <Tooltip content={tooltip}>
    <div className="w-full">
      {label && (
        <Text variant="secondary" size="sm" className="mb-1">
          {label}
        </Text>
      )}
      <Input {...props} />
    </div>
  </Tooltip>
);

const TextAreaWithTooltip: React.FC<TextAreaWithTooltipProps> = ({
  label,
  tooltip,
  ...props
}) => (
  <Tooltip content={tooltip}>
    <div className="w-full">
      {label && (
        <Text variant="secondary" size="sm" className="mb-1">
          {label}
        </Text>
      )}
      <textarea
        className="w-full h-24 bg-surface-secondary text-primary rounded-xl border border-surface-elevated p-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
        {...props}
      />
    </div>
  </Tooltip>
);

const GeneratePage = () => {
  const [form, setForm] = useState<CharacterForm>(initialForm);
  const [isAttributesValid, setIsAttributesValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingCharacterId, setEditingCharacterId] = useState<string | null>(null);
  const [loadingCharacter, setLoadingCharacter] = useState(false);
  const searchParams = useSearchParams();

  // Fetch character data when editing
  useEffect(() => {
    const characterId = searchParams.get('characterId');
    
    if (characterId && characterId !== 'undefined') {
      setIsEditMode(true);
      setEditingCharacterId(characterId);
      setLoadingCharacter(true);
      
      // Fetch character data from backend
      const fetchCharacter = async () => {
        try {
          const character = await ApiService.getInstance().getCharacterById(characterId);
          
          // Map ICharacter to CharacterForm
          const updatedForm: CharacterForm = {
            name: character.name || '',
            physicalBuild: {
              size: character.size || '',
              bodyType: character.bodyType || '',
              height: character.height || '',
              notableFeatures: character.notableFeatures || '',
            },
            combatAbilities: {
              fightingStyle: character.fightingStyle || '',
              weapons: character.weapons || '',
              specialTechnique: character.specialTechnique || '',
              experience: character.experience || '',
            },
            attributes: {
              strength: character.strength || 1,
              speed: character.speed || 1,
              defense: character.defense || 1,
              intelligence: character.intelligence || 1,
              magicPower: character.magicPower || 1,
            },
            specialAbilities: {
              primaryPower: character.primaryPower || '',
              powerLimitation: character.powerLimitation || '',
              defensiveAbility: character.defensiveAbility || '',
            },
            weaknesses: {
              criticalWeakness: character.criticalWeakness || '',
              environmentalLimitation: character.environmentalLimitation || '',
            },
            appearance: character.appearance || '',
            battlePersonality: character.battlePersonality || '',
          };
          
          setForm(updatedForm);
        } catch (error) {
          console.error('Failed to fetch character:', error);
        } finally {
          setLoadingCharacter(false);
        }
      };
      
      fetchCharacter();
    }
  }, [searchParams]);

  const getAttributesSum = () => {
    return Object.values(form.attributes).reduce(
      (sum, value) => sum + value,
      0
    );
  };

  const handleInputChange = (
    section: keyof CharacterForm,
    field: string,
    value: any
  ) => {
    let newValue = value;

    // Handle attributes validation
    if (section === "attributes") {
      // Ensure the value is between 1 and 10
      newValue = Math.max(1, Math.min(10, Number(value) || 1));

      // Calculate what the new sum would be
      const currentSum = getAttributesSum();
      const oldValue = form.attributes[field as keyof typeof form.attributes];
      const newSum = currentSum - oldValue + newValue;

      // If new sum would exceed limit, adjust the value
      if (newSum > MAX_ATTRIBUTES_SUM) {
        newValue = Math.max(1, newValue - (newSum - MAX_ATTRIBUTES_SUM));
      }
    }

    setForm((prev) => {
      const newForm = {
        ...prev,
        [section]:
          typeof prev[section] === "object"
            ? { ...prev[section], [field]: newValue }
            : newValue,
      };

      // Update validation state
      const newSum = Object.values(newForm.attributes).reduce(
        (sum, value) => sum + value,
        0
      );
      setIsAttributesValid(newSum <= MAX_ATTRIBUTES_SUM);

      return newForm;
    });
  };

  const generatePrompt = () => {
    return `CHARACTER NAME: ${form.name}

PHYSICAL BUILD:
- Size: ${form.physicalBuild.size}
- Body Type: ${form.physicalBuild.bodyType}
- Height: ${form.physicalBuild.height}
- Notable Physical Features: ${form.physicalBuild.notableFeatures}

COMBAT ABILITIES:
- Primary Fighting Style: ${form.combatAbilities.fightingStyle}
- Weapon/Tools: ${form.combatAbilities.weapons}
- Special Technique: ${form.combatAbilities.specialTechnique}
- Combat Experience: ${form.combatAbilities.experience}

ATTRIBUTES:
- Strength: ${form.attributes.strength}
- Speed: ${form.attributes.speed}
- Defense: ${form.attributes.defense}
- Intelligence: ${form.attributes.intelligence}
- Magic/Special Power: ${form.attributes.magicPower}

SPECIAL ABILITIES:
- Primary Power: ${form.specialAbilities.primaryPower}
- Power Limitation: ${form.specialAbilities.powerLimitation}
- Defensive Ability: ${form.specialAbilities.defensiveAbility}

WEAKNESSES:
- Critical Weakness: ${form.weaknesses.criticalWeakness}
- Environmental Limitation: ${form.weaknesses.environmentalLimitation}

APPEARANCE DESCRIPTION:
${form.appearance}

BATTLE PERSONALITY:
${form.battlePersonality}`;
  };

  const submitPrompt = () => {
    if (!isAttributesValid) {
      alert("Total attributes must be 35 or less!");
      return;
    }
    setIsLoading(true);
    setVideoUrl(null);

    ApiService.getInstance().submitPrompt(form).then((res) => {
      if (res.success) {
        alert('Prompt submitted successfully');
      } else {
        alert('Failed to submit prompt');
      }
    })
  };

  const renderPreview = () => {
    return (
      <CharacterGeneratorPreview
        isLoading={isLoading}
        videoUrl={videoUrl || ""}
        generatePrompt={generatePrompt}
      />
    );
  };

  // Show loading state while fetching character data
  if (loadingCharacter) {
    return (
      <Container size="xl" className="py-8">
        <div className="text-center">
          <Heading level={1} variant="gradient" className="mb-4">
            Loading Character...
          </Heading>
          <Spinner />
        </div>
      </Container>
    );
  }

  return (
    <Container size="xl" className="py-8">
      <div className="text-center mb-8">
        <Heading level={1} variant="gradient">
          {isEditMode ? 'Edit Character' : 'Character Generator'}
        </Heading>
        <Text variant="secondary" size="lg">
          {isEditMode ? 'Modify your AI battle character' : 'Create your AI battle character'}
        </Text>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Panel */}
        <Card className="p-6 space-y-6">
          <div className="space-y-4">
            <Heading level={3}>Basic Information</Heading>
            <InputWithTooltip
              placeholder="Character Name"
              value={form.name}
              onChange={(e) => handleInputChange("name", "", e.target.value)}
              tooltip={tooltips.name}
            />

            <Heading level={3}>Physical Build</Heading>
            <div className="grid grid-cols-2 gap-4">
              <InputWithTooltip
                placeholder="Size"
                value={form.physicalBuild.size}
                onChange={(e) =>
                  handleInputChange("physicalBuild", "size", e.target.value)
                }
                tooltip={tooltips.physicalBuild.size}
              />
              <InputWithTooltip
                placeholder="Body Type"
                value={form.physicalBuild.bodyType}
                onChange={(e) =>
                  handleInputChange("physicalBuild", "bodyType", e.target.value)
                }
                tooltip={tooltips.physicalBuild.bodyType}
              />
              <InputWithTooltip
                placeholder="Height"
                value={form.physicalBuild.height}
                onChange={(e) =>
                  handleInputChange("physicalBuild", "height", e.target.value)
                }
                tooltip={tooltips.physicalBuild.height}
              />
              <InputWithTooltip
                placeholder="Notable Features"
                value={form.physicalBuild.notableFeatures}
                onChange={(e) =>
                  handleInputChange(
                    "physicalBuild",
                    "notableFeatures",
                    e.target.value
                  )
                }
                tooltip={tooltips.physicalBuild.notableFeatures}
              />
            </div>

            <Heading level={3}>Combat Abilities</Heading>
            <div className="grid grid-cols-2 gap-4">
              <InputWithTooltip
                placeholder="Fighting Style"
                value={form.combatAbilities.fightingStyle}
                onChange={(e) =>
                  handleInputChange(
                    "combatAbilities",
                    "fightingStyle",
                    e.target.value
                  )
                }
                tooltip={tooltips.combatAbilities.fightingStyle}
              />
              <InputWithTooltip
                placeholder="Weapons/Tools"
                value={form.combatAbilities.weapons}
                onChange={(e) =>
                  handleInputChange(
                    "combatAbilities",
                    "weapons",
                    e.target.value
                  )
                }
                tooltip={tooltips.combatAbilities.weapons}
              />
              <InputWithTooltip
                placeholder="Special Technique"
                value={form.combatAbilities.specialTechnique}
                onChange={(e) =>
                  handleInputChange(
                    "combatAbilities",
                    "specialTechnique",
                    e.target.value
                  )
                }
                tooltip={tooltips.combatAbilities.specialTechnique}
              />
              <InputWithTooltip
                placeholder="Combat Experience"
                value={form.combatAbilities.experience}
                onChange={(e) =>
                  handleInputChange(
                    "combatAbilities",
                    "experience",
                    e.target.value
                  )
                }
                tooltip={tooltips.combatAbilities.experience}
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <Heading level={3}>Attributes (1-10)</Heading>
                <Text
                  variant={isAttributesValid ? "secondary" : "danger"}
                  size="sm"
                >
                  Total: {getAttributesSum()}/{MAX_ATTRIBUTES_SUM}
                </Text>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <InputWithTooltip
                  type="number"
                  min="1"
                  max="10"
                  label="Strength"
                  value={form.attributes.strength}
                  onChange={(e) =>
                    handleInputChange(
                      "attributes",
                      "strength",
                      parseInt(e.target.value)
                    )
                  }
                  tooltip={tooltips.attributes.strength}
                  className={!isAttributesValid ? "border-error" : ""}
                />
                <InputWithTooltip
                  type="number"
                  min="1"
                  max="10"
                  label="Speed"
                  value={form.attributes.speed}
                  onChange={(e) =>
                    handleInputChange(
                      "attributes",
                      "speed",
                      parseInt(e.target.value)
                    )
                  }
                  tooltip={tooltips.attributes.speed}
                  className={!isAttributesValid ? "border-error" : ""}
                />
                <InputWithTooltip
                  type="number"
                  min="1"
                  max="10"
                  label="Defense"
                  value={form.attributes.defense}
                  onChange={(e) =>
                    handleInputChange(
                      "attributes",
                      "defense",
                      parseInt(e.target.value)
                    )
                  }
                  tooltip={tooltips.attributes.defense}
                  className={!isAttributesValid ? "border-error" : ""}
                />
                <InputWithTooltip
                  type="number"
                  min="1"
                  max="10"
                  label="Intelligence"
                  value={form.attributes.intelligence}
                  onChange={(e) =>
                    handleInputChange(
                      "attributes",
                      "intelligence",
                      parseInt(e.target.value)
                    )
                  }
                  tooltip={tooltips.attributes.intelligence}
                  className={!isAttributesValid ? "border-error" : ""}
                />
                <InputWithTooltip
                  type="number"
                  min="1"
                  max="10"
                  label="Magic/Special Power"
                  value={form.attributes.magicPower}
                  onChange={(e) =>
                    handleInputChange(
                      "attributes",
                      "magicPower",
                      parseInt(e.target.value)
                    )
                  }
                  tooltip={tooltips.attributes.magicPower}
                  className={!isAttributesValid ? "border-error" : ""}
                />
              </div>
            </div>

            <Heading level={3}>Special Abilities</Heading>
            <div className="space-y-4">
              <InputWithTooltip
                placeholder="Primary Power"
                value={form.specialAbilities.primaryPower}
                onChange={(e) =>
                  handleInputChange(
                    "specialAbilities",
                    "primaryPower",
                    e.target.value
                  )
                }
                tooltip={tooltips.specialAbilities.primaryPower}
              />
              <InputWithTooltip
                placeholder="Power Limitation"
                value={form.specialAbilities.powerLimitation}
                onChange={(e) =>
                  handleInputChange(
                    "specialAbilities",
                    "powerLimitation",
                    e.target.value
                  )
                }
                tooltip={tooltips.specialAbilities.powerLimitation}
              />
              <InputWithTooltip
                placeholder="Defensive Ability"
                value={form.specialAbilities.defensiveAbility}
                onChange={(e) =>
                  handleInputChange(
                    "specialAbilities",
                    "defensiveAbility",
                    e.target.value
                  )
                }
                tooltip={tooltips.specialAbilities.defensiveAbility}
              />
            </div>

            <Heading level={3}>Weaknesses</Heading>
            <div className="space-y-4">
              <InputWithTooltip
                placeholder="Critical Weakness"
                value={form.weaknesses.criticalWeakness}
                onChange={(e) =>
                  handleInputChange(
                    "weaknesses",
                    "criticalWeakness",
                    e.target.value
                  )
                }
                tooltip={tooltips.weaknesses.criticalWeakness}
              />
              <InputWithTooltip
                placeholder="Environmental Limitation"
                value={form.weaknesses.environmentalLimitation}
                onChange={(e) =>
                  handleInputChange(
                    "weaknesses",
                    "environmentalLimitation",
                    e.target.value
                  )
                }
                tooltip={tooltips.weaknesses.environmentalLimitation}
              />
            </div>

            <Heading level={3}>Description</Heading>
            <div className="space-y-4">
              <TextAreaWithTooltip
                placeholder="Appearance Description"
                value={form.appearance}
                onChange={(e) =>
                  handleInputChange("appearance", "", e.target.value)
                }
                tooltip={tooltips.appearance}
              />
              <TextAreaWithTooltip
                placeholder="Battle Personality"
                value={form.battlePersonality}
                onChange={(e) =>
                  handleInputChange("battlePersonality", "", e.target.value)
                }
                tooltip={tooltips.battlePersonality}
              />
            </div>
          </div>
        </Card>

        {/* Preview Panel */}
        <Card className="p-6">
          <div className="sticky top-32">
            {renderPreview()}
            <div className="mt-4 flex justify-end">
              <Button
                variant="gradient"
                onClick={submitPrompt}
                disabled={isLoading || loadingCharacter}
              >
                {loadingCharacter 
                  ? "Loading..." 
                  : isLoading 
                    ? (isEditMode ? "Updating..." : "Generating...") 
                    : (isEditMode ? "Update Character" : "Generate Character")
                }
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </Container>
  );
};

export default GeneratePage;
