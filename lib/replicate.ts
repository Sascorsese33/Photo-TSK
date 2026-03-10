import Replicate from "replicate";

const replicateToken = process.env.REPLICATE_API_KEY;
let replicateClient: Replicate | null = null;

export function getReplicate() {
  if (!replicateToken) {
    throw new Error("REPLICATE_API_KEY is not configured.");
  }

  if (!replicateClient) {
    replicateClient = new Replicate({
      auth: replicateToken,
    });
  }

  return replicateClient;
}

type GenerateVehicleImageParams = {
  imageUrl: string;
  studioPrompt: string;
  logoUrl?: string;
  withCleanup?: boolean;
};

export async function generateVehicleImage({
  imageUrl,
  studioPrompt,
  logoUrl,
  withCleanup,
}: GenerateVehicleImageParams) {
  // Placeholder pipeline ready for stable diffusion/controlnet model wiring.
  // Call getReplicate() here when plugging a concrete model endpoint.
  return {
    inputImage: imageUrl,
    prompt: studioPrompt,
    logoUrl,
    withCleanup: Boolean(withCleanup),
    status: "queued",
  };
}
