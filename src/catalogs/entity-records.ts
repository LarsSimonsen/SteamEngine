import type { BatteryAccess, BatteryAppearance, BatteryFormFactor } from "./batteries/form-factor";

/*
 * Public encyclopedia records. The JSON files under ./entity-records/ are generated curated catalog data
 * (see DATA-LICENSE.md and CONTRIBUTING.md#catalog-data) and contain only the fields the site renders.
 */

export type BatteryAuthenticityStatus = "verified" | "suspected" | "unresolved" | "counterfeit";

export type BatteryAuthenticityAssessment = {
    readonly status: BatteryAuthenticityStatus;
    readonly confidence: "high" | "medium" | "low" | "unknown";
    readonly summary?: string;
    readonly checks?: readonly string[];
};

export type EntitySource = {
    readonly id: string;
    readonly title: string;
    /** Present only for web sources, which are rendered as links. */
    readonly url?: string;
    readonly publisher?: string;
    readonly limitations?: string;
};

export type EntityClaim = {
    readonly id: string;
    readonly statement: string;
    readonly evidenceDate?: string;
    readonly confidence?: string;
    readonly limitations?: string;
};

export type EntityReview = {
    readonly id: string;
    readonly reviewer: string;
    readonly reviewedAt: string;
    readonly verdict: string;
    readonly summary: string;
    readonly pros?: readonly string[];
    readonly reservations?: readonly string[];
};

type EntityRecordBase = {
    readonly entityId: string;
    readonly recordStatus: string;
    readonly updatedAt: string;
    readonly identity: {
        readonly identityStability: string;
    };
    readonly sources: readonly EntitySource[];
    readonly claims: readonly EntityClaim[];
};

export type BatteryEntityRecord = EntityRecordBase & {
    readonly summary: {
        readonly shortDescription: string;
        readonly description: string;
        readonly highlights: readonly string[];
    };
    readonly classifications?: readonly string[];
    readonly reviews: readonly EntityReview[];
    readonly safetyFindings: readonly {
        readonly summary?: string;
        readonly runtimeImplication?: string;
    }[];
    readonly domainData: {
        readonly batteryAccess: BatteryAccess | null;
        readonly formFactor: BatteryFormFactor | null;
        readonly weightGrams?: number;
        readonly chemistry?: string;
        readonly protected: boolean | null;
        readonly appearance: BatteryAppearance | null;
        readonly authenticity: BatteryAuthenticityAssessment | null;
    };
};

export type ModEntityRecord = EntityRecordBase & {
    readonly entityType: string;
    readonly summary: {
        readonly shortDescription: string | null;
        readonly description: string | null;
        readonly highlights: readonly string[];
    };
    readonly domainData?: {
        readonly deviceCategory?: string;
        readonly weightGrams?: number;
        readonly batterySystem?: {
            readonly configuration: string;
        };
        readonly batteryConfigurations?: readonly {
            readonly format?: string;
            readonly seriesCount?: number;
            readonly parallelCount?: number;
            readonly manufacturerClaimedCapacityMah?: number;
        }[];
        readonly boardRelationships?: readonly {
            readonly targetIdentity: string;
        }[];
    };
    readonly lifecycleEvents?: readonly {
        readonly id: string;
        readonly summary: string;
        readonly date?: string;
        readonly relation?: string;
        readonly confidence?: string;
    }[];
    readonly safetyFindings?: readonly {
        readonly id: string;
        readonly title: string;
        readonly summary: string;
        readonly appliesTo?: string;
        readonly status?: string;
    }[];
};
